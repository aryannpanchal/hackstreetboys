# COMPLETE CODE
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, classification_report, roc_curve, auc, ConfusionMatrixDisplay
from tensorflow.keras.models import Sequential # type: ignore
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization # type: ignore
from tensorflow.keras.optimizers import Adam # type: ignore
from tensorflow.keras.callbacks import EarlyStopping # type: ignore
import tensorflow as tf # type: ignore
import os
import random
from sklearn.preprocessing import StandardScaler

# Ensure reproducibility
os.environ['PYTHONHASHSEED'] = '42'
random.seed(42)
np.random.seed(42)
tf.keras.utils.set_random_seed(42)

# Load the dataset
data = pd.read_csv('Large_Augmented_ECG_PPG_Data.csv')

# Split the dataset into features (X) and target variable (y)
X = data.drop(columns=['Result'])  # Features (independent variables)
y = data['Result']  # Target variable (dependent variable)

# Ensure target variable is binary
y = y.astype(int)

# Split the dataset into train and test sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Feature Scaling using StandardScaler
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Define the neural network model
def create_model(learning_rate=0.001, dropout_rate=0.3, neurons=128, decay_rate=1e-6):
    model = Sequential()

    # Input layer
    model.add(Dense(neurons, input_dim=X_train_scaled.shape[1], activation='relu'))
    model.add(BatchNormalization())
    model.add(Dropout(dropout_rate))

    # Hidden layers
    model.add(Dense(neurons // 2, activation='relu'))
    model.add(BatchNormalization())
    model.add(Dropout(dropout_rate))

    model.add(Dense(neurons // 4, activation='relu'))
    model.add(BatchNormalization())
    model.add(Dropout(dropout_rate))

    # Output layer
    model.add(Dense(1, activation='sigmoid'))

    # Compile the model
    model.compile(optimizer=Adam(learning_rate=learning_rate, decay=decay_rate),
                  loss='binary_crossentropy',
                  metrics=['accuracy'])

    return model

# Early stopping callback
early_stop = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)

# Train the model
model = create_model(learning_rate=0.001, dropout_rate=0.3, neurons=200, decay_rate=1e-6)
history = model.fit(X_train_scaled, y_train, epochs=100, batch_size=32, validation_data=(X_test_scaled, y_test),
                    callbacks=[early_stop], verbose=1)

# Predict probabilities for the test data
y_pred_prob_test = model.predict(X_test_scaled)

# Convert probabilities to binary values
threshold = 0.5
y_pred_binary_test = (y_pred_prob_test >= threshold).astype(int).flatten()

# Confusion matrix
cm_test = confusion_matrix(y_test, y_pred_binary_test)
disp_test = ConfusionMatrixDisplay(confusion_matrix=cm_test, display_labels=['No Hyperglycemia', 'Hyperglycemia'])
disp_test.plot(cmap='Blues')
plt.title('Confusion Matrix (Test Dataset)')
plt.show()

# Classification report
print("Classification Report (Test Dataset):")
print(classification_report(y_test, y_pred_binary_test))

# Overall accuracy
overall_accuracy_test = np.mean(y_pred_binary_test == y_test.values)
print(f"Overall Accuracy (Test Dataset): {overall_accuracy_test:.4f}")

# ROC curve and AUC
fpr_test, tpr_test, thresholds_test = roc_curve(y_test, y_pred_prob_test)
roc_auc_test = auc(fpr_test, tpr_test)

plt.figure()
plt.plot(fpr_test, tpr_test, color='darkorange', lw=2, label=f'ROC curve (area = {roc_auc_test:.2f})')
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Receiver Operating Characteristic (Test Dataset)')
plt.legend(loc="lower right")
plt.show()

# Training process visualization
plt.figure(figsize=(12, 6))
plt.subplot(1, 2, 1)
plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.title('Training and Validation Loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(history.history['accuracy'], label='Train Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.title('Training and Validation Accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()

plt.tight_layout()
plt.show()
model.save("trained_hyperglycemia_model.h5")
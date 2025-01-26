import pandas as pd
import matplotlib.pyplot as plt
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, ConfusionMatrixDisplay, roc_curve, auc

file_with_asbestos = '../data/dataWithAsbestos.csv'
file_without_asbestos = '../data/dataWithoutAsbestos_2.csv'

data_with_asbestos = pd.read_csv(file_with_asbestos)
data_without_asbestos = pd.read_csv(file_without_asbestos)

data_with_asbestos['label'] = 1
data_without_asbestos['label'] = 0

data_with_asbestos = data_with_asbestos.rename(
    columns={'Latitude': 'lat', 'Longitude': 'lon', 'AverageConstructionYearNearby': 'year_of_construction'})
data_without_asbestos = data_without_asbestos.rename(
    columns={'Latitude': 'lat', 'Longitude': 'lon', 'Year': 'year_of_construction'})

combined_data = pd.concat([data_with_asbestos, data_without_asbestos])

cleaned_data = combined_data.dropna(subset=['year_of_construction', 'lat', 'lon'])

features = cleaned_data[['year_of_construction', 'lat', 'lon']]
target = cleaned_data['label']

X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.5, random_state=42)

model = RandomForestClassifier(random_state=42, n_estimators=100)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
y_pred_proba = model.predict_proba(X_test)[:, 1] 

accuracy = accuracy_score(y_test, y_pred)

print("Accuracy:", accuracy)
print("Classification Report:\n", classification_report(y_test, y_pred))

conf_matrix = confusion_matrix(y_test, y_pred)
disp = ConfusionMatrixDisplay(conf_matrix, display_labels=["No Asbestos", "Asbestos Present"])
disp.plot(cmap='Blues')
plt.title("Predictions vs Reality")
plt.xlabel("Prediction")
plt.ylabel("Actual Value")
plt.show()

fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
roc_auc = auc(fpr, tpr)

plt.figure(figsize=(10, 6))
plt.plot(fpr, tpr, color='blue', label=f"ROC curve (area = {roc_auc:.2f})")
plt.plot([0, 1], [0, 1], color='gray', linestyle='--')
plt.xlabel("False Positive Rate")
plt.ylabel("True Positive Rate")
plt.title("ROC Curve: Model Performance")
plt.legend(loc="lower right")
plt.grid()
plt.show()


# Save the trained model
joblib.dump(model, 'asbestos_model_2.pkl')
print("Model saved successfully!")


import pandas as pd
import re

# File path for input and output
file_path = r"C:\McHacks12\Ai\data\out.csv"  # Update this to the actual location of your CSV file
output_path = r"C:\McHacks12\Ai\data\expanded_file.csv"  # Path for saving the expanded file

# Read the file as a single column
data = pd.read_csv(file_path, header=0)

# Ensure it reads correctly
print("Data loaded successfully!")
print(data.head())

# Function to expand intervals
def expand_intervals(row):
    match = re.match(r"(\d+)-(\d+)\s(.+)", row)
    if match:
        start, end, address = match.groups()
        return [f"{i} {address}" for i in range(int(start), int(end) + 1)]
    else:
        return [row]

# Expand intervals for the single column
expanded_data = []
for row in data['add_compl']:  # Adjust to your column name
    expanded_data.extend(expand_intervals(row))

# Create a new DataFrame
expanded_df = pd.DataFrame(expanded_data, columns=["add_compl"])

# Add a new column 'city' with the value 'Montréal'
expanded_df["city"] = "Montréal"

# Save the expanded data to a new CSV file
expanded_df.to_csv(output_path, index=False)
print(f"Expanded CSV file with 'city' column saved at {output_path}")

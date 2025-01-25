import pandas as pd

def filter_columns(input_file, output_file):
    # Define the columns to keep
    columns_to_keep = [
        "Asset-name_Nom_du_bien",
        "Street-number_Numéro-civique",
        "Address_Adresse",
        "City_Ville",
        "Province-Code_Code-de-province",
        "Province_Territory_Province_Territoire",
        "Postal-code_Code-postal",
        "Asbestos_Amiante"
    ]

    # Read the input CSV file
    try:
        df = pd.read_csv(input_file)
    except FileNotFoundError:
        print(f"Error: The file '{input_file}' was not found.")
        return

    # Filter the columns
    filtered_df = df[columns_to_keep]

    # Save the filtered DataFrame to a new CSV file
    filtered_df.to_csv(output_file, index=False)
    print(f"Filtered file saved to '{output_file}'.")

# Specify input and output file paths
input_file = "Ai\data\inaspac-niapspc-eng.csv"
output_file = "Ai\data\data_amiante.csv"  # Replace with your desired output file path

# Call the function to filter columns
filter_columns(input_file, output_file)
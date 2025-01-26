import csv

def load_data(file):
    """
    Charge les données du fichier CSV dans un dictionnaire.
    :param file: Le chemin vers le fichier CSV.
    :return: Un dictionnaire avec les codes postaux comme clés et les probabilités de radon comme valeurs.
    """
    data = {}
    try:
        with open(file, mode='r') as csv_file:
            reader = csv.DictReader(csv_file, delimiter=';')
            for row in reader:
                postal_code = row['RTA']
                radon_prob = float(row['RadonProb'])
                data[postal_code] = radon_prob
    except FileNotFoundError:
        print(f"Le fichier {file} est introuvable.")
    except KeyError as e:
        print(f"Colonne manquante dans le fichier CSV : {e}")
    return data

def getRadonProbability(data, postalCode):
    """
    Retourne la probabilité de radon pour un code postal donné.
    :param data: Le dictionnaire des données.
    :param postalCode: Le code postal à rechercher.
    :return: La probabilité de radon ou un message si le code postal est introuvable.
    """
    return data.get(postalCode, "Code postal introuvable.")
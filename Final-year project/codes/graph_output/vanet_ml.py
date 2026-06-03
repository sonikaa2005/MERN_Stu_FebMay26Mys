import numpy as np
import pandas as pd
import networkx as nx
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt
import random

# -------------------------------
# Step 1: Generate Synthetic VANET Data
# -------------------------------
def generate_vanet_dataset(num_nodes=50, num_samples=3000):
    data = []
    for _ in range(num_samples):
        src = random.randint(0, num_nodes - 1)
        dest = random.randint(0, num_nodes - 1)
        while dest == src:
            dest = random.randint(0, num_nodes - 1)

        distance = np.random.uniform(100, 1000)  # meters
        neighbor_density = np.random.randint(1, 15)
        link_stability = np.random.uniform(0.5, 1.0)
        speed = np.random.uniform(10, 30)  # m/s

        # Label: 1 = Good next hop, 0 = Bad next hop
        label = 1 if (link_stability > 0.7 and neighbor_density >= 3 and distance < 700) else 0

        data.append([src, dest, distance, neighbor_density, link_stability, speed, label])

    df = pd.DataFrame(data, columns=["src", "dest", "distance", "neighbor_density", "link_stability", "speed", "label"])
    return df

# -------------------------------
# Step 2: Train ML Model
# -------------------------------
def train_model(df):
    X = df[["distance", "neighbor_density", "link_stability", "speed"]]
    y = df["label"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train, y_train)

    y_pred = clf.predict(X_test)
    print("\nModel Accuracy:", accuracy_score(y_test, y_pred))
    print("\nClassification Report:\n", classification_report(y_test, y_pred))

    return clf

# -------------------------------
# Step 3: Simulate VANET Routing
# -------------------------------
def simulate_routing(clf, num_nodes=50, num_packets=500):
    G = nx.erdos_renyi_graph(num_nodes, 0.15)  # Random graph topology
    delivered = 0
    total_hops = 0
    total_delay = 0

    for _ in range(num_packets):
        src = random.randint(0, num_nodes - 1)
        dest = random.randint(0, num_nodes - 1)
        while dest == src:
            dest = random.randint(0, num_nodes - 1)

        try:
            path = nx.shortest_path(G, source=src, target=dest)
            hops = len(path) - 1
            delay = hops * np.random.uniform(0.01, 0.1)

            total_hops += hops
            total_delay += delay
            delivered += 1
        except nx.NetworkXNoPath:
            continue

    pdr = delivered / num_packets
    avg_hops = total_hops / delivered if delivered else 0
    avg_delay = total_delay / delivered if delivered else 0

    print(f"\nRouting Simulation Results:")
    print(f"PDR: {pdr*100:.2f}%")
    print(f"Average Hops: {avg_hops:.2f}")
    print(f"Average Delay: {avg_delay:.4f} s")

# -------------------------------
# Main Execution
# -------------------------------
if __name__ == "__main__":
    print("Generating dataset...")
    df = generate_vanet_dataset()
    df.to_csv("vanet_dataset.csv", index=False)
    print("Dataset saved as vanet_dataset.csv")

    print("\nTraining Machine Learning Model...")
    clf = train_model(df)

    print("\nSimulating VANET Routing...")
    simulate_routing(clf)

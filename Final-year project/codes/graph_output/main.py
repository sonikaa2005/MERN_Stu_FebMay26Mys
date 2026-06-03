import numpy as np
import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# -----------------------------
# Step 1: Generate Synthetic VANET Data
# -----------------------------
def generate_vanet_data(num_vehicles=50, num_samples=1000):
    data = []
    for _ in range(num_samples):
        src = np.random.randint(0, num_vehicles)
        dest = np.random.randint(0, num_vehicles)
        while dest == src:
            dest = np.random.randint(0, num_vehicles)
        
        distance = np.random.uniform(100, 1000)  # meters
        neighbor_density = np.random.randint(1, 15)  # number of neighbors
        link_stability = np.random.uniform(0.5, 1.0)  # 0.5–1.0 (higher = more stable)
        vehicle_speed = np.random.uniform(10, 30)  # m/s
        
        label = 1 if (link_stability > 0.7 and neighbor_density > 3) else 0
        
        data.append([src, dest, distance, neighbor_density, link_stability, vehicle_speed, label])
    
    columns = ["src", "dest", "distance", "neighbor_density", "link_stability", "vehicle_speed", "best_next_hop"]
    return pd.DataFrame(data, columns=columns)

# -----------------------------
# Step 2: Train ML Model
# -----------------------------
def train_model(df):
    X = df[["distance", "neighbor_density", "link_stability", "vehicle_speed"]]
    y = df["best_next_hop"]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"Model Accuracy: {acc*100:.2f}%")
    return model

# -----------------------------
# Step 3: Simulate VANET Routing
# -----------------------------
def simulate_routing(model, num_vehicles=50, num_packets=200):
    G = nx.erdos_renyi_graph(num_vehicles, 0.1)  # Random network topology
    nx.set_edge_attributes(G, np.random.uniform(0.5, 1.0, size=G.number_of_edges()), "stability")
    
    delivered = 0
    total_hops = 0
    total_delay = 0
    
    for _ in range(num_packets):
        src = np.random.randint(0, num_vehicles)
        dest = np.random.randint(0, num_vehicles)
        while dest == src:
            dest = np.random.randint(0, num_vehicles)
        
        try:
            path = nx.shortest_path(G, source=src, target=dest)
            hops = len(path) - 1
            delay = hops * np.random.uniform(0.01, 0.1)  # seconds
            
            total_hops += hops
            total_delay += delay
            delivered += 1
        except nx.NetworkXNoPath:
            continue
    
    pdr = delivered / num_packets
    avg_hops = total_hops / delivered if delivered > 0 else 0
    avg_delay = total_delay / delivered if delivered > 0 else 0
    
    print(f"PDR: {pdr*100:.2f}%")
    print(f"Average Hops: {avg_hops:.2f}")
    print(f"Average Delay: {avg_delay:.3f} s")

# -----------------------------
# Main Execution
# -----------------------------
if __name__ == "__main__":
    print("Generating VANET dataset...")
    df = generate_vanet_data()
    df.to_csv("vanet_dataset.csv", index=False)
    print("Dataset saved as vanet_dataset.csv")
    
    print("\nTraining ML model...")
    model = train_model(df)
    
    print("\nSimulating VANET routing...")
    simulate_routing(model)

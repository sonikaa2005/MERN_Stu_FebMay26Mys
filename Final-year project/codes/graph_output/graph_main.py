import matplotlib.pyplot as plt
import random

def simulate_duevr(num_nodes=50, num_rounds=100):
    pdr = []
    latency = []
    throughput = []

    for r in range(num_rounds):
        pdr.append(random.uniform(0.8, 1.0))
        latency.append(random.uniform(50, 200))
        throughput.append(random.uniform(1, 10))

    return pdr, latency, throughput

def plot_results(pdr, latency, throughput):
    rounds = list(range(1, len(pdr)+1))

    plt.figure(figsize=(6,4))
    plt.plot(rounds, pdr, marker='o', label="PDR")
    plt.xlabel("Rounds")
    plt.ylabel("Packet Delivery Ratio")
    plt.title("Packet Delivery Ratio over Rounds")
    plt.grid(True)
    plt.legend()
    plt.savefig("static/pdr.png")
    plt.close()

    plt.figure(figsize=(6,4))
    plt.plot(rounds, latency, marker='s', color="red", label="Latency")
    plt.xlabel("Rounds")
    plt.ylabel("Latency (ms)")
    plt.title("Latency over Rounds")
    plt.grid(True)
    plt.legend()
    plt.savefig("static/latency.png")
    plt.close()

    plt.figure(figsize=(6,4))
    plt.plot(rounds, throughput, marker='^', color="green", label="Throughput")
    plt.xlabel("Rounds")
    plt.ylabel("Throughput (Mbps)")
    plt.title("Throughput over Rounds")
    plt.grid(True)
    plt.legend()
    plt.savefig("static/throughput.png")
    plt.close()

def main():
    pdr, latency, throughput = simulate_duevr()
    plot_results(pdr, latency, throughput)
    print("Graphs generated successfully inside static/ folder.")

if __name__ == "__main__":
    main()

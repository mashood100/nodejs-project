class DatabaseLoadBalancer {
  private readonly readReplicas: string[];
  private currentIndex: number = 0;

  constructor(replicas: string[]) {
    this.readReplicas = replicas;
  }

  getNextReadReplica(): string {
    const replica = this.readReplicas[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.readReplicas.length;
    return replica;
  }
}

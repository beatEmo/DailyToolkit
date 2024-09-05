class Audio {
  nodes: Map<string, any>;
  context: AudioContext;
  constructor() {
    this.nodes = new Map();
    this.context = new AudioContext();
    this.initAudio();
  }

  initAudio() {
    const osc = this.context.createOscillator();
    osc.frequency.value = 220;
    osc.type = "square";
    osc.start();
    const volume = this.context.createGain();
    volume.gain.value = 0.5;
    const out = this.context.destination;
    this.nodes.set("a", osc);
    this.nodes.set("b", volume);
    this.nodes.set("c", out);
  }

  get isRunning() {
    return this.context.state === "running";
  }

  toggleAudio() {
    return this.isRunning ? this.context.suspend() : this.context.resume();
  }

  updateAudio(id: string, data: Record<string, any>) {
    const node = this.nodes.get(id);
    for (const [key, val] of Object.entries(data)) {
      if (node[key] instanceof AudioParam) {
        node[key].value = val;
      } else {
        node[key] = val;
      }
    }
  }

  removeAudioNode(id: string) {
    if (!this.nodes.has(id)) return false;
    const node = this.nodes.get(id);
    node.disconnect();
    node?.stop();
    this.nodes.delete(id);
  }

  connect(sourceId: string, targetId: string) {
    if (!this.nodes.has(sourceId) || !this.nodes.has(targetId)) return false;
    const sourceNode = this.nodes.get(sourceId);
    const targetNode = this.nodes.get(targetId);
    sourceNode.connect(targetNode);
  }

  disconnect(sourceId: string, targetId: string) {
    if (!this.nodes.has(sourceId) || !this.nodes.has(targetId)) return false;
    const sourceNode = this.nodes.get(sourceId);
    const targetNode = this.nodes.get(targetId);
    sourceNode.disconnect(targetNode);
  }

  createAudioNode(id: string, type: string, data: Record<string, any>) {
    switch (type) {
      case "osc": {
        const oscNode = this.context.createOscillator();
        oscNode.type = data.type;
        oscNode.frequency.value = data.frequency;
        oscNode.start();
        this.nodes.set(id, oscNode);
        break;
      }
      case "volume": {
        const volumeNode = this.context.createGain();
        volumeNode.gain.value = data.gain;
        this.nodes.set(id, volumeNode);
        break;
        break;
      }
    }
  }
}

export default new Audio();

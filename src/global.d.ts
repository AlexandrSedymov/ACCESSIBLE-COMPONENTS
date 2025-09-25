interface CSS {
  paintWorklet: {
    addModule(url: string | URL): Promise<void>;
  };
}

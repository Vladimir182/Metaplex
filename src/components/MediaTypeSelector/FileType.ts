export enum FileType {
  AUDIO,
  VIDEO,
  IMAGE,
  VR,
  HTML,
}

export const FiletypeAcceptMap = {
  [FileType.HTML]: "HTML",
  [FileType.IMAGE]: ".png,.jpg,.svg",
  [FileType.VIDEO]: ".mp4",
  [FileType.VR]: ".glb",
  [FileType.AUDIO]: ".mp3",
};

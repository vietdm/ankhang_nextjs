const _color_ = {
  giam_doc_cap_cao: "#791eaf",
  giam_doc: "#b60810",
  pho_giam_doc: "#ff31bf",
  truong_phong: "#ffbc00",
  chuyen_vien: "#0479bd",
  nomal: "#1c8949",
  new: "#737373",
};

export const Color = (type: string) => {
  // @ts-ignore
  return _color_[type] ?? _color_.new;
};

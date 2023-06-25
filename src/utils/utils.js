const IsValidUrl = (text) => {
  const urlPattern =
    /(http|https):\/\/[\w\-]+(\.[\w\-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/;
  return urlPattern.test(text);
};

export default IsValidUrl;

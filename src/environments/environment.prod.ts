// export const environment = {
//   production: true
// };

export const environment = {
  production: true,
  apiUrl: window["env"]["apiUrl"] || "default",
  cartridge_url: window["env"]["cartridge_url"] || "default",
  user_url: window["env"]["user_url"] || "default",
  debug: window["env"]["debug"] || false,
  grafana:'http://52.66.144.197:31000',
  metadata_DB: 'http://10.108.182.224:5432',
  influxdb_DB: 'http://10.109.128.30:8086',
};
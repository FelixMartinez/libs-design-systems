export const backgrounds = [
  { name: 'main1', value: '#00A94F' },
  { name: 'main2', value: '#55ACED' },
  { name: 'main3', value: '#FF9100' },
  { name: 'gray1', value: '#FFFFFF' },
  { name: 'gray2', value: '#FAFAFA' },
  { name: 'gray3', value: '#E5E5E5' },
  { name: 'gray4', value: '#9C9C9C' },
  { name: 'gray5', value: '#333333' },
  { name: 'gray6', value: '#FF9100' },
  { name: 'exceptional1', value: '#FFA513' },
  { name: 'exceptional2', value: '#63B9F0' },
  { name: 'exceptional3', value: '#F14649' },
  { name: 'exceptional4', value: '#00B555' },
  { name: 'special1', value: '#14B8B8' },
  { name: 'special2', value: '#314A9F' },
  { name: 'special3', value: '#8246A0' },
  { name: 'special4', value: '#F0AA00' },
  { name: 'alert1', value: '#33BA6A' },
  { name: 'alert2', value: '#F25154' },
  { name: 'alert3', value: '#FFA32C' },
];

export const toAttr = (fn, config, name) => `${name}="${config ? fn(config) : fn()}"`;

export const comps = (allProps, config = {}) => {
  let ret = '';

  Object.entries(allProps).forEach(name => {
    ret += toAttr(name[1], config[name[0]], name[0]);
  });
  return ret;
};

export const buildComponent = (tag, allProps = {}) => config =>
  `<${tag} ${comps(allProps, config)}></${tag}>`;

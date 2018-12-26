export class EditColumnConfigurations {
  name: string;
  id: string;
  checked: boolean;
  configurations: Array<{}>;

  constructor(editColumnConfig: any, savedConfig: any) {
    this.name = editColumnConfig.name;
    this.id = this.name.toLocaleLowerCase();
    this.checked = true;
    this.configurations = [];

    if (savedConfig !== null && editColumnConfig.name === savedConfig.name) {
      this.checked = savedConfig.checked;
      editColumnConfig.configurations.forEach(configName => {
        const configurationState = {};
        configurationState['name'] = configName;
        savedConfig.configurations.forEach(savedConfigState => {
          if (configName === savedConfig.name) {
            configurationState['value'] = savedConfigState.value;
          }
        });
        this.configurations.push(configurationState);
      });
    } else if (savedConfig === null) {
      editColumnConfig.configurations.forEach(editConfigName => {
        const configurationState = {};
        configurationState['name'] = editConfigName;
        configurationState['value'] = true;

        this.configurations.push(configurationState);
      })
    }

  }
}

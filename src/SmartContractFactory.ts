import { ethers } from 'ethers';
import baseRegistrarImplementationArtifact from './artifact/baseRegistrarImplementation.json';
import registrarControllerArtifact from './artifact/registrarController.json';
import getProvider from './getProvider';

export default class SmartContractFactory {
  static createBaseRegistrarImplementation() {
    return new ethers.Contract(
      baseRegistrarImplementationArtifact.address,
      baseRegistrarImplementationArtifact.abi,
      getProvider(),
    );
  }

  static createRegistrarController() {
    return new ethers.Contract(
      registrarControllerArtifact.address,
      registrarControllerArtifact.abi,
      getProvider(),
    );
  }
}

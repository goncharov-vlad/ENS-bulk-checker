import { ethers } from 'ethers';
import baseRegistrarImplementationArtifact from './artifact/baseRegistrarImplementation.json';
import registrarControllerArtifact from './artifact/registrarController.json';

export default class SmartContractFactory {
  static createBaseRegistrarImplementation() {
    return new ethers.Contract(
      baseRegistrarImplementationArtifact.address,
      baseRegistrarImplementationArtifact.abi,
      SmartContractFactory.getProvider(),
    );
  }

  static createRegistrarController() {
    return new ethers.Contract(
      registrarControllerArtifact.address,
      registrarControllerArtifact.abi,
      SmartContractFactory.getProvider(),
    );
  }

  private static getProvider() {
    return new ethers.providers.JsonRpcProvider(process.env.RPC_PROVIDER);
  }
}

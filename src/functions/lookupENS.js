import { ethers } from "ethers"
import baseRegistrarImplementationArtifact from '../artifacts/baseRegistrarImplementation.js'
import registrarControllerArtifact from '../artifacts/registrarController.js'

const localProvider = new ethers.providers.JsonRpcProvider('http://localhost:8545')

const provider = localProvider

const baseRegistrarImplementationContract = new ethers.Contract(
  baseRegistrarImplementationArtifact.address,
  baseRegistrarImplementationArtifact.abi,
  provider
)

const registrarControllerContract = new ethers.Contract(
  registrarControllerArtifact.address,
  registrarControllerArtifact.abi,
  provider
)

async function lookupENS(name) {
  const preparedName = name.toLowerCase().trim()
  const BigNumber = ethers.BigNumber
  const utils = ethers.utils
  const labelHash = utils.keccak256(utils.toUtf8Bytes(preparedName))
  const tokenId = BigNumber.from(labelHash).toString()
  const price = await registrarControllerContract.rentPrice(preparedName, 1)
  const expires = await baseRegistrarImplementationContract.nameExpires(tokenId)
  const available = await baseRegistrarImplementationContract.available(tokenId)

  const result = {
    name: preparedName,
    price: ethers.utils.formatUnits(price, 'gwei'),
    expires: expires.toNumber() * 1000,
    available
  }

  return result
}

export default lookupENS
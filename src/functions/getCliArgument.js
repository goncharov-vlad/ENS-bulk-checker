function getCliArgument(argument, required = true) {
  const argv = process.argv.slice(2)

  if (!argv.includes(argument) && required) {
    throw new Error(`Specify '${argument}' argument`)
  }

  if (!argv.includes(argument)) {
    return null
  }

  return argv[argv.indexOf(argument) + 1]
}

export default getCliArgument
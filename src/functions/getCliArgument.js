function getCliArgument(argument) {
  const argv = process.argv.slice(2)

  if (!argv.includes(argument)) {
    throw new Error(`Specify '${argument}' argument`)
  }

  const value = argv[argv.indexOf(argument) + 1]

  return value
}

export default getCliArgument
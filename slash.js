const {
 SlashCommandParser,
 SlashCommand,
 SlashCommandNamedArgument,
 SlashCommandArgument,
 ARGUMENT_TYPE,
 SlashCommandEnumValue,
} = SillyTavern.getContext();

SlashCommandParser.addCommandObject(SlashCommand.fromProps({
 name: 'dbg',
 callback: (named_args, unnamed_args) => {
  // Parser gives string when 1 unnamed arg defined, array when multiple, undefined when none.
  // [unnamed_args].flat() normalizes all three cases into a flat array to always join safely.
  const args = [unnamed_args].flat();
  const message = args.join(' ') || 'ok';
  const level = named_args.level || 'log';
  console[level](message);
  // Return value allows use in STscript pipes and macro chains
  return message;
 },
 returns: 'the debug message that was printed',
 // Named args allow optional flags without relying on position
 namedArgumentList: [
  SlashCommandNamedArgument.fromProps({ name: 'level',
   description: 'log level for console output',
   typeList: ARGUMENT_TYPE.STRING,
   defaultValue: 'log',
   // Enum restricts input to valid console methods, prevents crashes
   enumList: ['log', 'warn', 'error', 'info', 'debug'],
  }),
  // add more named args here
 ],
 // Unnamed args are the freeform rest, captured as array for flexibility
 unnamedArgumentList: [
  SlashCommandArgument.fromProps({ description: 'message to print',
   typeList: ARGUMENT_TYPE.STRING,
   // Optional so /dbg alone is valid, usability
   isRequired: false,
  }),
  // add more unnamed args here
 ],
 helpString: 'Prints a debug message to console.',
}));
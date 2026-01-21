let output = "";
for (let i = 1; i < 10; i++) {  //i=2
  //i=1
  for (let j = 0; j < i; j++) {    //j=0<2
    output += "\u002a"; //* //**
  }
  output += "\n";
}
console.log(output);

const inquirer = require('inquirer');
const {writeFile} = require('fs/promises');
const {Square, Triangle, Circle} = require('./develop/tests/shapes');
const SVG = require('./develop/tests/svg');
const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters for the logo:',
    validate: function(value) {
      if (value.length > 3) {
        return 'Text must be less than or equal to three characters';
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color (color name or color number):'
  },
  {
    type: 'list',
    name: 'shapeType',
    message: 'Select a shape:',
    choices: ['Triangle', 'Circle', 'Square']
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color (color name or color number):'
  }
];

inquirer.prompt(questions).then(({text,textColor, shapeType, shapeColor}) => {
  let shape;

  switch (shapeType) {
    case 'Triangle':
      shape = new Triangle();
      break;
    case 'Circle':
      shape = new Circle();
      break;
    default:
      shape = new Square();
      break;
  
  }
shape.setColor(shapeColor)
const svg = new SVG()
svg.setText(text, textColor)
svg.setShape(shape)
return writeFile("./examples/logo.svg", svg.render())

})
.then(() => console.log("Generated logo.svg"))

.catch(err => console.log(err));
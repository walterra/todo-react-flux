# todo-react-flux

This is a sample todo application to demonstrate the usage of:

- custom flux implementation using `d3-dispatch`
- project setup and dependency management with npm
- build process with rollup/buble
- tests with karma/tape,
- other: react, less

You can test a deployed version here: http://rafelsberger.at/todo-react-flux/

To run the code locally, checkout the repository, then:

```bash
# fetch dependencies, run tests and initial build
npm install

# run a web server and access it via e.g. http://localhost:8080/
npm run-script start

# for development, runs the same server but watches js and less
# files to trigger a rebuild when changing a file
nnpm run-script watch
```

Next Steps:

- Improve tree handling and fix bugs when the features of indentation, collapsing and deletion are used
- Better structure of the React Code with possible multiple components
- More test coverage esp. the React part
- Implement keyboard short cuts and improve accessbility
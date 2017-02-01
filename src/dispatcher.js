// this is just a wrapper for d3-dispatch so we don't have to
// call it with an argument for `this`
import {dispatch} from 'd3-dispatch';

export default function() {
  var d3_dispatch = dispatch.apply(dispatch, arguments);

  var dispatcher = function(action, data) {
    d3_dispatch.call(action, null, data);
  };

  // http://stackoverflow.com/a/38335479/2266116
  dispatcher.on = function() {
    var value = d3_dispatch.on.apply(d3_dispatch, arguments);
    return value === d3_dispatch ? dispatcher : value;
  };

  return dispatcher;
}

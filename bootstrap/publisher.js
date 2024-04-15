import listener from './listener.js';
export default function(name, handles = []) {
    const publisher = function(param) {
        return listener.fireEventListener(name, param);
    };
    publisher.on = function(handle, once = false) {
        return listener.addEventListener(name, handle, once);
    };
    publisher.off = function(handle) {
        return listener.removeEventListener(name, handle);
    };
    publisher.clear = function() {
        return listener.removeEventListener(name, null);
    };
    return publisher;
}
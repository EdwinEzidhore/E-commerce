module.exports = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);   //any error that cannot be handled by us gives a promise pending   error.so to handle that error promise.resolve and passes to next middleware means default node middleware
  
}
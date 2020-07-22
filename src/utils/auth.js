export const requireAuth = (to, from, next) => {
  if (!isLoggedIn()) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

function isLoggedIn () {
  return !!window.localStorage.getItem('apollo-token') 
}

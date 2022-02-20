export function getDate(date) {
   let formated = new Date(date.replace(/-/g, "/")).toLocaleString('ru-RU', { month: 'numeric', day: 'numeric', year: 'numeric' })
   return formated
}

export function getTime(date) {
   let formated = new Date(date.replace(/-/g, "/")).toLocaleString('ru-RU', { hour: 'numeric', minute: 'numeric' })
   return formated
}

export function getFilteredObject(data, key) {
   if (data) {
      const filteredOject = data.reduce((accum, item) => {
         if (!(getDate(item[key]) in accum))
            accum[getDate(item[key])] = []
         accum[getDate(item[key])].push(item)
         return accum
      }, [])
      return filteredOject
   }
}


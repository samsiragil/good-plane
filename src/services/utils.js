export const sortByCreatedAt = (list, sortType='DESC') => {
 return list.sort((taskA,taskB) => {
  let sortData = {
    a: sortType == 'ASC' ? taskB.createdAt : taskA.createdAt,
    b: sortType == 'ASC' ? taskA.createdAt : taskB.createdAt,
  }
  return moment(sortData.a).diff(moment(sortData.b))
 }); 
}

export const isNotEmpty = (data) => {
  if (data === null || data === undefined) {
    return false;
  }

  if (typeof data === 'string' && data.trim() === '') {
    return false;
  }

  if (Array.isArray(data) && data.length === 0) {
    return false;
  }

  if (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0) {
    return false;
  }

  return true;
}

export const generalDelay = (timeout=300) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, timeout);
  });
}
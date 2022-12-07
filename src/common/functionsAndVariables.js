
export const institutionTypes = [
    'Hospital',
    'Health Center'
]


export const accessLevels = [
    { role: "Super Admin", level: 0},
    { role: "Hospital Admin", level: 1},
    { role:  "Health Center Admin", level: 5 },
    { role: 'Receptionist', level: 10 },
    { role: 'Nurse', level: 100 }
  ]

  // check if is super admin
export const isSuperAdmin = (accessLevel) => {
    return accessLevel === 0 ? true : false 
  }
  
  //check if is super admin
  export const isHospitalAdmin = (accessLevel) => {
    return accessLevel === 1 ? true : false 
  }
  // check if Health center admin
  export const isHealthCenterAdmin = (accessLevel) => {
    return accessLevel === 5 ? true : false
  }
  
  // check if Receptionist 
  export const isReceptionist = (accessLevel) => {
    return accessLevel === 10 ? true : false
  }
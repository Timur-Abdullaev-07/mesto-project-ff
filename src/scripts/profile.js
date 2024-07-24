const setNewProfilePhoto = (fotoElement, newFoto) => {
    fotoElement.style = `background-image: url(${newFoto.avatar});`
}

const setNewProfileName = (nameElement, jobElement, newData) => {
    nameElement.textContent = newData.name;
    jobElement.textContent = newData.about;
}

export {setNewProfilePhoto, setNewProfileName}
const newProfileFoto = (fotoElement, newFoto) => {
    fotoElement.style = `background-image: url(${newFoto.avatar});`
}

const newProfileName = (nameElement, jobElement, newData) => {
    nameElement.textContent = newData.name;
    jobElement.textContent = newData.about;
}

export {newProfileFoto, newProfileName}
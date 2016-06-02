getRelatedProfiles =  profile => {
    return profile.relatedProfiles.peopleAlsoViewed.concat(profile.relatedProfiles.similar)
}

module.exports = {
    getRelatedProfiles: getRelatedProfiles
}
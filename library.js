module.exports = {
  handleFetchErrors: function(response) {
    // Function to handle Fetch errors
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  },
};

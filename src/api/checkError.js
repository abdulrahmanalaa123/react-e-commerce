export default async function checkError(supabaseHandle, props) {
  try {
    const returnObject = await supabaseHandle(props);
    if (returnObject.error) {
      throw returnObject.error;
    }
    // should be changed to return statements
    if (returnObject.data) {
      if (returnObject.data.user) {
        console.log(returnObject.data.user);
      }

      console.log(returnObject.data);
    }
  } catch (error) {
    console.log(error);
  }
}

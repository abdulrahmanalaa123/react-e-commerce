function Heart({ filled }) {
  return (
    <>
      {filled ? (
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.3391 27.5737L24.9879 38.4645C25.5433 39.0325 26.4574 39.0326 27.0128 38.4645L37.6616 27.5737C40.3514 24.8228 40.3514 20.4271 37.6616 17.6762C34.8849 14.8364 30.3158 14.8364 27.5391 17.6762L26.0003 19.25L24.4616 17.6762C21.6849 14.8364 17.1158 14.8364 14.3391 17.6762C11.6493 20.4271 11.6493 24.8228 14.3391 27.5737Z"
            fill="#387709"
          />
        </svg>
      ) : (
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="inherit"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.9253 18.2005C21.4429 15.6617 17.3578 15.6617 14.8754 18.2005C12.4706 20.66 12.4706 24.5899 14.8754 27.0494L25.5241 37.9401C25.7854 38.2073 26.2153 38.2073 26.4766 37.9401L37.1253 27.0494C39.5301 24.5899 39.5301 20.66 37.1253 18.2005C34.6429 15.6617 30.5578 15.6617 28.0754 18.2005L26.5366 19.7743C26.3955 19.9186 26.2022 20 26.0003 20C25.7985 20 25.6052 19.9186 25.4641 19.7743L23.9253 18.2005ZM13.8029 17.1519C16.8737 14.0112 21.927 14.0112 24.9978 17.1519L26.0003 18.1772L27.0029 17.1519C30.0737 14.0112 35.127 14.0112 38.1978 17.1519C41.1726 20.1943 41.1726 25.0556 38.1978 28.098L27.5491 38.9888C26.6994 39.8578 25.3013 39.8578 24.4516 38.9888L13.8029 28.098C10.8281 25.0556 10.8281 20.1943 13.8029 17.1519Z"
            fill="#387709"
          />
        </svg>
      )}
    </>
  );
}

export default Heart;
// http://adamwhitcroft.com/climacons/

const Svg = ({ children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="20 20  70 70"
  >
    {children}
  </svg>
)

const Fog = () => (
  <Svg>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M69.998 65.641H30.003a2 2 0 0 1 0-4h39.995a2 2 0 0 1 0 4zm0-8H30.003a2 2 0 0 1 0-4h39.995a2 2 0 0 1 0 4zm-9.999-11.998c-1.601 0-3.083.48-4.333 1.291-1.232-5.317-5.974-9.291-11.665-9.291-6.626 0-11.998 5.373-11.998 12h-4c0-8.835 7.163-15.999 15.998-15.999 6.004 0 11.229 3.312 13.965 8.204.664-.113 1.337-.205 2.033-.205 5.222 0 9.652 3.342 11.301 8h-4.381a7.987 7.987 0 0 0-6.92-4zM30.003 69.639h39.995a2 2 0 0 1 0 4H30.003a2 2 0 0 1 0-4z"
    />
  </Svg>
)

const ClearDay = () => (
  <Svg>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M71.997 51.999h-3.998a2 2 0 1 1 0-3.999h3.998a2 2 0 0 1 0 3.999zm-7.855-13.311a2 2 0 1 1-2.828-2.828l2.828-2.828a2 2 0 1 1 2.828 2.828l-2.828 2.828zm-14.141 23.31c-6.627 0-12-5.372-12-11.998 0-6.627 5.372-11.999 12-11.999 6.627 0 11.998 5.372 11.998 11.999 0 6.626-5.371 11.998-11.998 11.998zm0-19.997A8 8 0 1 0 50 58a8 8 0 0 0 .001-15.999zm0-7.999a2 2 0 0 1-2-2v-3.999a2 2 0 0 1 4 0v3.999c0 1.104-.897 2-2 2zM35.86 38.688l-2.828-2.828a2 2 0 1 1 2.828-2.828l2.828 2.828a2 2 0 1 1-2.828 2.828zM34.002 50a2 2 0 0 1-2 1.999h-4a1.999 1.999 0 0 1 0-3.999h4a2 2 0 0 1 2 2zm1.858 11.312a2 2 0 1 1 2.828 2.828l-2.828 2.828a2 2 0 1 1-2.828-2.828l2.828-2.828zm14.141 4.686a2 2 0 0 1 2 1.999v4a2 2 0 0 1-4 0v-4a2 2 0 0 1 2-1.999zm14.141-4.686l2.828 2.828a2 2 0 1 1-2.828 2.828l-2.828-2.828a2 2 0 1 1 2.828-2.828z"
    />
  </Svg>
)
const ClearNight = () => (
  <Svg>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50 61.998c-6.627 0-11.999-5.372-11.999-11.998 0-6.627 5.372-11.999 11.999-11.999.755 0 1.491.078 2.207.212a7.988 7.988 0 0 0-.208 1.788 8 8 0 0 0 8 7.999c.615 0 1.212-.076 1.788-.208.133.717.211 1.452.211 2.208 0 6.626-5.372 11.998-11.998 11.998zm-1.788-19.79c-3.556.813-6.211 3.989-6.211 7.792A8 8 0 0 0 50 57.999c3.802 0 6.978-2.655 7.791-6.211a11.998 11.998 0 0 1-9.579-9.58z"
    />
  </Svg>
)

const PartlyCloudyDay = () => (
  <Svg>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M79.941 43.641h-4a2 2 0 0 1 0-3.998h4a2 2 0 1 1 0 3.998zm-7.857-13.312a2 2 0 0 1-2.828-2.827l2.828-2.828a2 2 0 1 1 2.828 2.828l-2.828 2.827zm-2.947 15.607a11.949 11.949 0 0 1 2.806 7.705c0 6.625-5.372 11.998-11.999 11.998H43.946c-8.835 0-15.998-7.162-15.998-15.998s7.163-15.998 15.998-15.998c1.572 0 3.09.232 4.523.654 2.195-2.827 5.618-4.654 9.475-4.654 6.627 0 11.999 5.373 11.999 11.998a11.983 11.983 0 0 1-.806 4.295zm-37.19 3.705c0 6.627 5.371 11.998 11.998 11.998h15.998a8 8 0 0 0 0-15.998c-1.6 0-3.083.482-4.333 1.291-1.231-5.316-5.974-9.289-11.665-9.289-6.627 0-11.998 5.371-11.998 11.998zm25.996-15.998a7.972 7.972 0 0 0-5.662 2.349 16.113 16.113 0 0 1 5.629 5.854c.664-.113 1.337-.205 2.033-.205 2.125 0 4.119.559 5.85 1.527.096-.494.15-1.004.15-1.527a8 8 0 0 0-8-7.998zm0-8a1.999 1.999 0 0 1-1.999-1.999v-3.999a2 2 0 1 1 3.999 0v3.999a1.998 1.998 0 0 1-2 1.999zm-14.14 4.686l-2.827-2.827a2 2 0 0 1 2.827-2.828l2.828 2.828a1.998 1.998 0 1 1-2.828 2.827z"
    />
  </Svg>
)

const PartlyCloudyNight = () => (
  <Svg>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M43.945 65.639c-8.835 0-15.998-7.162-15.998-15.998 0-8.836 7.163-15.998 15.998-15.998 6.004 0 11.229 3.312 13.965 8.203.664-.113 1.338-.205 2.033-.205 6.627 0 11.999 5.373 11.999 12 0 6.625-5.372 11.998-11.999 11.998H43.945zm15.998-4a8 8 0 1 0 0-15.998c-1.6 0-3.082.481-4.333 1.291-1.231-5.316-5.974-9.29-11.665-9.29-6.626 0-11.998 5.372-11.998 11.999 0 6.626 5.372 11.998 11.998 11.998h15.998z"
    />
  </Svg>
)
const Cloudy = () => (
  <Svg>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M43.945 65.639c-8.835 0-15.998-7.162-15.998-15.998 0-8.836 7.163-15.998 15.998-15.998 6.004 0 11.229 3.312 13.965 8.203.664-.113 1.338-.205 2.033-.205 6.627 0 11.999 5.373 11.999 12 0 6.625-5.372 11.998-11.999 11.998H43.945zm15.998-4a8 8 0 1 0 0-15.998c-1.6 0-3.082.481-4.333 1.291-1.231-5.316-5.974-9.29-11.665-9.29-6.626 0-11.998 5.372-11.998 11.999 0 6.626 5.372 11.998 11.998 11.998h15.998z"
    />
  </Svg>
)
const Rain = () => (
  <Svg>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M63.943 64.941V60.56a7.988 7.988 0 0 0 4-6.92 8 8 0 0 0-8-7.999c-1.6 0-3.082.48-4.333 1.291-1.231-5.317-5.974-9.29-11.665-9.29-6.626 0-11.998 5.372-11.998 11.998 0 3.55 1.551 6.728 4 8.925v4.916c-4.777-2.768-8-7.922-8-13.841 0-8.835 7.163-15.997 15.998-15.997 6.004 0 11.229 3.311 13.965 8.203.664-.113 1.338-.205 2.033-.205 6.627 0 11.999 5.372 11.999 11.999 0 5.223-3.341 9.653-7.999 11.301zm-21.997-11.3a2 2 0 0 1 1.999 2v15.998a2 2 0 1 1-3.999 0V55.641a2 2 0 0 1 2-2zm7.999 4a2 2 0 0 1 2 2v15.998a2 2 0 0 1-4 0V59.641a2 2 0 0 1 2-2zm7.999-4a2 2 0 0 1 1.999 2v15.998a2 2 0 1 1-3.999 0V55.641a2 2 0 0 1 2-2z"
    />
  </Svg>
)

const Sleet = () => (
  <Svg>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M63.999 64.941V60.56a7.987 7.987 0 0 0 3.999-6.92A8 8 0 0 0 60 45.641c-1.601 0-3.084.48-4.334 1.291-1.231-5.317-5.974-9.29-11.665-9.29-6.626 0-11.998 5.372-11.998 11.998 0 3.55 1.55 6.728 3.999 8.925v4.916c-4.776-2.768-7.998-7.922-7.998-13.841 0-8.835 7.162-15.997 15.997-15.997 6.004 0 11.229 3.311 13.966 8.203.663-.113 1.336-.205 2.033-.205 6.626 0 11.998 5.372 11.998 11.999 0 5.223-3.342 9.653-7.999 11.301zm-21.997.698c-1.104 0-1-.895-1-1.998v-8c0-1.104-.104-2 1-2s1 .896 1 2v8c0 1.103.104 1.998-1 1.998zm0 4a2 2 0 1 1-.002 4 2 2 0 0 1 .002-4zm7.999 0c-1.104 0-1-.895-1-2v-7.998c0-1.105-.104-2 1-2s1 .895 1 2v7.998c0 1.105.104 2-1 2zm0 4a2 2 0 1 1 0 3.998 2 2 0 0 1 0-3.998zm7.999-8c-1.104 0-1-.895-1-1.998v-8c0-1.104-.104-2 1-2s1 .896 1 2v8c0 1.103.104 1.998-1 1.998zm0 4a2 2 0 1 1-.001 4.001A2 2 0 0 1 58 69.64z"
    />
  </Svg>
)

const Snow = () => (
  <Svg>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M61.998 65.461v-4.082c3.448-.891 6-4.012 6-7.738a8 8 0 0 0-7.999-7.999c-1.601 0-3.084.48-4.334 1.291-1.231-5.317-5.973-9.291-11.664-9.291-6.627 0-11.999 5.373-11.999 12 0 4.438 2.417 8.305 5.999 10.379v4.445c-5.86-2.375-9.998-8.113-9.998-14.825 0-8.835 7.162-15.999 15.998-15.999 6.004 0 11.229 3.312 13.965 8.204.664-.113 1.336-.205 2.033-.205 6.626 0 11.998 5.373 11.998 11.998 0 5.947-4.326 10.867-9.999 11.822zm-18.926-5.82a2 2 0 0 1 2.732-.732L48 60.176v-2.535a2 2 0 0 1 4 0v2.535l2.195-1.268a2 2 0 0 1 2 3.464l-2.196 1.268 2.196 1.268a2 2 0 1 1-2 3.462L52 67.104v2.535a2 2 0 0 1-4 0v-2.535l-2.195 1.268a2 2 0 1 1-2-3.462L46 63.641l-2.195-1.268a2.001 2.001 0 0 1-.733-2.732zm6.928 6a2 2 0 1 0-.001-4.001A2 2 0 0 0 50 65.64z"
    />
  </Svg>
)

const Wind = () => (
  <Svg>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M76.746 69.588v.051h-3.749a2 2 0 0 1 0-3.999h3a2 2 0 0 0 0-3.999 2 2 0 1 1 .402-3.959c3.122.211 5.597 2.783 5.597 5.958a5.999 5.999 0 0 1-5.25 5.948zM65.998 57.641a2 2 0 1 1 .403-3.959c3.121.211 5.596 2.783 5.596 5.959a5.996 5.996 0 0 1-5.249 5.947v.052H44.001a2 2 0 0 0 0 3.999h22.747v.053a5.996 5.996 0 0 1 5.249 5.947c0 3.175-2.475 5.747-5.596 5.958a2 2 0 1 0-.403-7.958H43.251v-.052a5.998 5.998 0 0 1-5.25-5.948c0-1.055.294-2.032.773-2.89-6.265-2.168-10.771-8.104-10.771-15.107 0-8.835 7.162-15.998 15.998-15.998 6.004 0 11.229 3.312 13.965 8.204.664-.114 1.336-.205 2.033-.205 5.896 0 10.788 4.256 11.798 9.862a9.934 9.934 0 0 0-4.849-1.815 7.99 7.99 0 0 0-6.949-4.047c-1.601 0-3.084.48-4.334 1.29-1.231-5.316-5.973-9.29-11.664-9.29-6.627 0-11.999 5.372-11.999 11.999 0 6.626 5.372 11.999 11.999 11.999h21.997a2 2 0 0 0 0-4z"
    />
  </Svg>
)

export const icons = {
  fog: Fog,
  'clear-day': ClearDay,
  'clear-night': ClearNight,
  'partly-cloudy-day': PartlyCloudyDay,
  'partly-cloudy-night': PartlyCloudyNight,
  cloudy: Cloudy,
  sleet: Sleet,
  snow: Snow,
  rain: Rain,
  wind: Wind,
}

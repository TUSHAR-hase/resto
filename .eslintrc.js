module.exports = {
  extends: ["next", "next/core-web-vitals", "eslint:recommended", "plugin:react/recommended"],
  rules: {
    "react/no-unescaped-entities": "off",         // single quotes (') ke warning band
    "react-hooks/exhaustive-deps": "off",         // useEffect dependency warnings band
    "@next/next/no-img-element": "off"     ,
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",        // <img> tag ke warning band
  }
};

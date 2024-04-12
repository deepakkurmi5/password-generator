import { useCallback, useEffect, useState } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState<number>(8);
  const [numberAllow, setNumberAllow] = useState<boolean>(false);
  const [charAllow, setCharAllow] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  function handleInputRange(e: React.ChangeEvent<HTMLInputElement>) {
    setLength(Number(e.target.value));
  }

  const passwordGenerator = useCallback(() => {
    let password = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllow) string += "0123456789";
    if (charAllow) string += "!@#$[]{}-+*=~`%^&";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * string.length + 1);
      password += string.charAt(char);
    }

    setPassword(password);
  }, [length, numberAllow, charAllow, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, charAllow, passwordGenerator]);

  return (
    <div className="password-generator">
      <div className="generator-card">
        <div className="from-control">
          <input value={password} type="text" name="password" readOnly />
          <button>Copy</button>
        </div>
        <div className="password-controllers">
          <div className="input-range">
            <input
              type="range"
              min={6}
              max={100}
              name="length"
              id="length"
              value={length}
              onChange={handleInputRange}
            />
            <label htmlFor="length">Lenght({length})</label>
          </div>
          <div className="form-checkbox">
            <input
              type="checkbox"
              name="numbers"
              id="numbers"
              onChange={() => setNumberAllow((pre) => !pre)}
            />
            <label htmlFor="numbers">Numbers</label>
          </div>
          <div className="form-checkbox">
            <input
              type="checkbox"
              name="charactors"
              id="charactors"
              onChange={() => setCharAllow((pre) => !pre)}
            />
            <label htmlFor="charactors">Charactors</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;

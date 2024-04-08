import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Button,
  Container,
  Grid,
  InputLabel,
  TextField,
  Theme,
  Typography,
} from "@mui/material";

const CurrencyConverter = () => {
  const [countryCode, setCountryCode] = useState<[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [convertedAmount, setConvertedAmount] = useState<any>(null);

  useEffect(() => {
    getCountryViseCurrency();
  }, []);

  const getCountryViseCurrency = () => {
    const apiUrl = "https://api.frankfurter.app/currencies";
    fetch(apiUrl).then((res) => {
      res.json().then((data) => {
        setCountryCode(data);
      });
    });
  };

  const handleConvert = async () => {
    try {
      const host = "api.frankfurter.app";
      await fetch(
        `https://${host}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setConvertedAmount(data.rates[toCurrency]);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      maxWidth="sm"
    >
      <Typography variant="h4" gutterBottom>
        Currency Converter
      </Typography>
      <div
        style={{
          display: "flex",
          marginBottom: 2,
        }}
      >
        <FormControl
          sx={{
            minWidth: 120,
            marginRight: 2,
          }}
        >
          <Select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Convert From
            </MenuItem>
            {Object.keys(countryCode as any).map((code, index) => (
              <MenuItem value={code} key={index}>
                {code}
              </MenuItem>
            ))}
            {/* Add more currencies as needed */}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            minWidth: 120,
            marginRight: 2,
          }}
        >
          <Select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Convert To
            </MenuItem>
            {Object.keys(countryCode as any).map((code, index) => (
              <MenuItem value={code} key={index}>
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <TextField
        label="Amount"
        variant="outlined"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        // marginBottom={2}
      />
      <Button variant="contained" color="primary" onClick={handleConvert}>
        Convert
      </Button>
      {convertedAmount && (
        <Typography variant="h6" gutterBottom>
          Converted Amount: {convertedAmount} {toCurrency}
        </Typography>
      )}
    </Container>
  );
};
export default CurrencyConverter;

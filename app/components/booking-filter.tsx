"use client";

import type { FormEvent, RefObject } from "react";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { categories, type Category } from "@/lib/travel-data";
import { Icon } from "./travel-ui";

export type Journey = { category: Category; pickup: string; destination: string; date: string; passengers: string; experience: string };
type Props = {
  category: Category;
  journey: Journey;
  onCategoryChange: (category: Category) => void;
  onJourneyChange: (journey: Journey) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  formRef: RefObject<HTMLFormElement | null>;
};

const theme = createTheme({
  components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
  palette: { primary: { main: "#153d36" }, background: { paper: "#fcf9f3" }, text: { primary: "#153d36", secondary: "#646761" } },
  typography: { fontFamily: '"DM Sans", Arial, sans-serif', button: { textTransform: "none", fontWeight: 600 } },
  shape: { borderRadius: 13 },
});
const adornment = (name: "pin" | "calendar" | "user") => <InputAdornment position="start"><Icon name={name} /></InputAdornment>;

export function BookingFilter({ category, journey, onCategoryChange, onJourneyChange, onSubmit, formRef }: Props) {
  const isExperience = category === "tours" || category === "excursions";
  return <ThemeProvider theme={theme}><section className="booking-wrap booking-ui" id="booking" aria-label="Préparer votre voyage">
    <Tabs className="booking-tabs" value={category} onChange={(_, value: Category) => onCategoryChange(value)} aria-label="Services de voyage" selectionFollowsFocus variant="fullWidth">
      {categories.map(item => <Tab className={`booking-service-tab ${category === item.id ? "selected" : ""}`} key={item.id} id={`tab-${item.id}`} value={item.id} label={item.label} icon={<Icon name={item.icon} />} iconPosition="start" aria-controls="booking-panel" />)}
    </Tabs>
    <form className="booking-form" id="booking-panel" ref={formRef} role="tabpanel" aria-labelledby={`tab-${category}`} onSubmit={onSubmit}>
      <TextField className="booking-field booking-mui-field" fullWidth id="booking-pickup" name="pickup" label={isExperience ? "Lieu de départ" : "Prise en charge"} placeholder="Ville, aéroport ou hôtel" required value={journey.pickup} onChange={event => onJourneyChange({ ...journey, pickup: event.target.value })} slotProps={{ inputLabel: { shrink: true }, input: { startAdornment: adornment("pin") }, htmlInput: { maxLength: 150, "aria-label": "Prise en charge" } }} />
      <TextField className="booking-field booking-mui-field" fullWidth id="booking-destination" name="destination" label={isExperience ? "Destination" : "Lieu d’arrivée"} placeholder="Ville, aéroport ou hôtel" required value={journey.destination} onChange={event => onJourneyChange({ ...journey, destination: event.target.value })} slotProps={{ inputLabel: { shrink: true }, input: { startAdornment: adornment("pin") }, htmlInput: { maxLength: 150, "aria-label": "Lieu d’arrivée" } }} />
      <TextField className="booking-field booking-mui-field date-field" fullWidth id="booking-date" name="date" label="Date" type="date" required value={journey.date} onChange={event => onJourneyChange({ ...journey, date: event.target.value })} onFocus={event => { const now = new Date(); const input = event.target as HTMLInputElement; input.min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`; }} slotProps={{ inputLabel: { shrink: true }, input: { startAdornment: adornment("calendar") }, htmlInput: { "aria-label": "Date du voyage" } }} />
      <TextField className="booking-field booking-mui-field passengers-field" fullWidth id="booking-passengers" name="passengers" label="Voyageurs" select value={journey.passengers} onChange={event => onJourneyChange({ ...journey, passengers: event.target.value })} slotProps={{ inputLabel: { shrink: true }, input: { startAdornment: adornment("user") }, select: { MenuProps: { slotProps: { paper: { className: "booking-passenger-menu", sx: { maxHeight: 300, borderRadius: 3, mt: 1, border: "1px solid #e3ddd3", boxShadow: "0 12px 40px #153d361a" } } } } } }}>
        {Array.from({ length: 16 }, (_, i) => <MenuItem key={i + 1} value={String(i + 1)}>{i + 1} voyageur{i ? "s" : ""}</MenuItem>)}
      </TextField>
      <Button className="button primary search-button booking-submit" variant="contained" type="submit" disableElevation endIcon={<Icon name="arrow" />}>Préparer ma demande</Button>
    </form>
  </section></ThemeProvider>;
}

import Link from "next/link";
import React, { useState } from "react";
import { Calendar, MapPin, Filter, ChevronDown } from "lucide-react";


const CarListingsPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);

import IntervaloMalo from "./pages/IntervaloMalo";
import IntervaloBueno from "./pages/IntervaloBueno";
import BucleInfinitoMalo from "./pages/BucleInfinitoMalo";
import BucleInfinitoBueno from "./pages/BucleInfinitoBueno";
import DependenciaMalo from "./pages/DependenciaMalo";
import DependenciaBueno from "./pages/DependenciaBueno";
import RefFocusMalo from "./pages/RefFocusMalo";
import RefFocusBueno from "./pages/RefFocusBueno";
import RefPrevioMalo from "./pages/RefPrevioMalo";
import RefPrevioBueno from "./pages/RefPrevioBueno";
import MemoRendimientoMalo from "./pages/MemoRendimientoMalo";
import MemoRendimientoBueno from "./pages/MemoRendimientoBueno";
import MemoDependenciasMalo from "./pages/MemoDependenciasMalo";
import MemoDependenciasBueno from "./pages/MemoDependenciasBueno";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ContadorMalo from "./pages/ContadorMalo";
import ContadorBueno from "./pages/ContadorBueno";
import HooksMenu from "./pages/HooksMenu";
import FormularioMalo from "./pages/FormularioMalo";
import FormularioBueno from "./pages/FormularioBueno";
import EstadoDePropsMalo from "./pages/EstadoDePropsMalo";
import EstadoDePropsBueno from "./pages/EstadoDePropsBueno";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hooks" element={<HooksMenu />} />
        <Route path="/hooks/usestate/contador" element={<ContadorMalo />} />
        <Route path="/hooks/usestate/contador-bueno" element={<ContadorBueno />} />
        <Route path="/hooks/usestate/objeto" element={<FormularioMalo />} />
        <Route path="/hooks/usestate/objeto-bueno" element={<FormularioBueno />} />
        <Route path="/hooks/usestate/props" element={<EstadoDePropsMalo valorInicial={5} />} />
        <Route path="/hooks/usestate/props-bueno" element={<EstadoDePropsBueno valorInicial={5} />} />
        <Route path="/hooks/useeffect/intervalo" element={<IntervaloMalo />} />
        <Route path="/hooks/useeffect/intervalo-bueno" element={<IntervaloBueno />} />
        <Route path="/hooks/useeffect/bucle" element={<BucleInfinitoMalo />} />
        <Route path="/hooks/useeffect/bucle-bueno" element={<BucleInfinitoBueno />} />
        <Route path="/hooks/useeffect/dependencias" element={<DependenciaMalo />} />
        <Route path="/hooks/useeffect/dependencias-bueno" element={<DependenciaBueno />} />
        <Route path="/hooks/useref/focus" element={<RefFocusMalo />} />
        <Route path="/hooks/useref/focus-bueno" element={<RefFocusBueno />} />
        <Route path="/hooks/useref/previo" element={<RefPrevioMalo />} />
        <Route path="/hooks/useref/previo-bueno" element={<RefPrevioBueno />} />
        <Route path="/hooks/usememo/rendimiento" element={<MemoRendimientoMalo />} />
        <Route path="/hooks/usememo/rendimiento-bueno" element={<MemoRendimientoBueno />} />
        <Route path="/hooks/usememo/dependencias" element={<MemoDependenciasMalo />} />
        <Route path="/hooks/usememo/dependencias-bueno" element={<MemoDependenciasBueno />} />
      </Routes>
    </BrowserRouter>
  );
}

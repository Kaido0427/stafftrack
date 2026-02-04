import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import LoginPage from "../pages/LoginPage";
import admin_dashbord from "../pages/AdminDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import ReponsableLayout from "../layouts/ReponsableLayout";
import Agents from "../pages/Agents";
import AdminLayout from "../layouts/AdminLayout";
import Responsables from "../pages/Responsables";
import HistoriquePositions from "../pages/HistoriquePositions";
import AgentLayout from "../layouts/AgentLayout";
import AgentDashbord from "../pages/AgentDashbord";
import MesPositions from "../pages/MesPositions";
import AgentPosition from "../pages/AgentPosition";
import AgentParametre from "../pages/AgentParametre";
import ResponsableDashboard from "../pages/ResponsableDashboard";
import ListeAgentsResponsable from "../pages/ListeAgentsResponsable";
import ValidationPositions from "../pages/ValidationPositions";
import ParametresResponsable from "../pages/ParametresResponsable";


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />
                {/* Private routes */}
                <Route path="/admin"
                    element={<PrivateRoute >
                        <AdminLayout>
                            <AdminDashboard />
                        </AdminLayout>
                    </PrivateRoute>}
                />
                <Route path="/admin/agents"
                    element={<PrivateRoute >
                        <AdminLayout>
                            <Agents />
                        </AdminLayout>
                    </PrivateRoute>}
                />
                <Route path="/admin/responsables"
                    element={<PrivateRoute >
                        <AdminLayout>
                            <Responsables />
                        </AdminLayout>
                    </PrivateRoute>}
                />
                <Route path="/admin/historique"
                    element={<PrivateRoute >
                        <AdminLayout>
                            <HistoriquePositions />
                        </AdminLayout>
                    </PrivateRoute>}
                />

                {/* Les routes pour partie responsable */}

                <Route path="/responsables"
                    element={<PrivateRoute >
                        <ReponsableLayout>
                            <ResponsableDashboard />
                        </ReponsableLayout>
                    </PrivateRoute>}
                />
                <Route path="/responsables/listeAgents"
                    element={<PrivateRoute >
                        <ReponsableLayout>
                            <ListeAgentsResponsable />
                        </ReponsableLayout>
                    </PrivateRoute>}
                />
                <Route path="/responsables/ValidationPositions"
                    element={<PrivateRoute >
                        <ReponsableLayout>
                            <ValidationPositions />
                        </ReponsableLayout>
                    </PrivateRoute>}
                />
                <Route path="/responsables/ParametresResponsable"
                    element={<PrivateRoute >
                        <ReponsableLayout>
                            <ParametresResponsable />
                        </ReponsableLayout>
                    </PrivateRoute>}
                />


                {/* Les routes pour partie  Agent */}

                   <Route path="/agent"
                    element={<PrivateRoute >
                        <AgentLayout>
                            <AgentDashbord />
                        </AgentLayout>
                    </PrivateRoute>}
                />
                   <Route path="/agent/positions"
                    element={<PrivateRoute >
                        <AgentLayout>
                            <MesPositions />
                        </AgentLayout>
                    </PrivateRoute>}
                />
                   <Route path="/agent/nouvelleposition"
                    element={<PrivateRoute >
                        <AgentLayout>
                            <AgentPosition />
                        </AgentLayout>
                    </PrivateRoute>}
                />
                   <Route path="/agent/parametre"
                    element={<PrivateRoute >
                        <AgentLayout>
                            <AgentParametre />
                        </AgentLayout>
                    </PrivateRoute>}
                />


            </Routes>
        </Router>
    );
};


export default AppRouter;
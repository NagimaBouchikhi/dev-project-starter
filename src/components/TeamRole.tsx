import { Briefcase, CheckCircle, UserCog } from "lucide-react";
import type { Architecture } from "../types";
import '../styles/TeamRole.css';

interface TeamRoleProps {
    architecture: Architecture
    mode : 'solo' | 'team'; //mode choisi par le user
}

export const TeamRoles: React.FC<TeamRoleProps> = ({architecture, mode}) => {

    return(

        <div className="team-roles">

            {/**Header */}
            <div className="team-roles-header">
                <Briefcase size={24} />
                <h3 className="team-roles-title">
                    {mode === 'solo' ? 'Plan d\'attaque (Solo)' : "Répartition des rôles (Équipe)"}
                </h3>
            </div>

            {/**Mode solo */}
            {mode === 'solo' && (
                <div className="team-roles-solo">
                    {architecture.workflow.solo.map((step,index) => (
                        <div key={index} className="solo-step">
                            <CheckCircle size={18}/>
                            <p>{step}</p>
                        </div>
                    ))}
                    <div className="solo-quote">
                        "Diviser pour mieux régner !"
                    </div>
                </div>
            )}

            {/**Mode équipe */}
            {mode === 'team' && (
                <div className="team-roles-team">
                    {architecture.workflow.team.map((role,index) => (
                        <div key={index} className='team-roles-card'>
                            <div className="team-role-header">
                                <UserCog size={20}/>
                                <h4 className="team-role-title">{role.title}</h4>
                            </div>

                            <p className="team-roles-description">
                                {role.description}
                            </p>

                            <div className="team-role-focus">
                                {role.focus.map((folder,idx) => (
                                    <span key={idx} className="team-role-badge">
                                        {folder}
                                    </span>
                                ))}
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>

    )
}
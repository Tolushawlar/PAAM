import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ListingCard from "../../components/ListingCard";
import moduleImage from "../../assets/moduleImage.svg";
import { useData } from "../../contexts/DataContext";




function UserMandateTraining() {
    const navigate = useNavigate();
    const { trainingPrograms, allModules, loading, fetchTrainingPrograms } = useData();
    const [organizedPrograms, setOrganizedPrograms] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            await fetchTrainingPrograms();
        };
        loadData();
    }, []);

    useEffect(() => {
        if (trainingPrograms.length > 0 && allModules.length > 0) {
            // Organize modules by training program and stage
            const organized = trainingPrograms.map(program => {
                const programModules = allModules
                    .filter(module => module.trainingId === program.id)
                    .sort((a, b) => (a.stageOrder || 0) - (b.stageOrder || 0));
                
                // Group modules by stage (assuming stageOrder determines stage)
                const stages = {};
                programModules.forEach(module => {
                    const stageNum = Math.ceil((module.stageOrder || 1) / 5); // 5 modules per stage
                    const stageName = `Stage ${stageNum}`;
                    if (!stages[stageName]) {
                        stages[stageName] = [];
                    }
                    stages[stageName].push({
                        id: module.id,
                        text: module.name,
                        subtext: module.description || `Module ${module.id}`,
                        moduleData: module
                    });
                });
                
                return {
                    program,
                    stages: Object.entries(stages).map(([stageName, modules]) => ({
                        stage: stageName,
                        modules
                    }))
                };
            });
            setOrganizedPrograms(organized);
        }
    }, [trainingPrograms, allModules]);

    if (loading.allTrainingData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8144a]"></div>
                <span className="ml-3 text-lg text-gray-600">Loading training programs...</span>
            </div>
        );
    }

    return (
        <div className="p-6 w-full space-y-12">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">12-Week Intensive Program</h1>
                <p className="text-gray-600">
                    The PAAM Global Digital Hub 12-week intensive program equips participants with spiritual depth,
                    practical knowledge, and digital empowerment for kingdom impact. Through discipleship, skill
                    development, community building, and project-based learning, each stage builds on the last to foster
                    holistic growth in both faith and professional capacity.
                </p>
            </div>

            {/* Loop through programs and stages */}
            {organizedPrograms.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No training programs available</p>
                </div>
            ) : (
                organizedPrograms.map((programData) => (
                    <div key={programData.program.id} className="space-y-8">
                        <h2 className="text-2xl font-bold text-gray-800">{programData.program.name}</h2>
                        {programData.stages.map((stage) => (
                            <div key={stage.stage} className="space-y-4">
                                <p className="text-xl font-semibold">{stage.stage}</p>
                                {stage.modules.map((module) => (
                                    <ListingCard
                                        key={module.id}
                                        image={moduleImage}
                                        text={module.text}
                                        subtext={module.subtext}
                                        onClick={() => navigate("/user/MandateTraining/CourseModules", {
                                            state: { 
                                                module: module.moduleData,
                                                program: programData.program 
                                            }
                                        })}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
}

export default UserMandateTraining;

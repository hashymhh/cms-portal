import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axiosWrapper from "../../utils/AxiosWrapper";
import Heading from "../../components/Heading";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";
import { FiDownload, FiEye, FiBook, FiFileText, FiVideo, FiArchive } from "react-icons/fi";

const Material = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState("1");
  const [selectedType, setSelectedType] = useState("all");

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      let url = `/material?semester=${selectedSemester}`;
      if (selectedType !== "all") {
        url += `&type=${selectedType}`;
      }
      
      const response = await axiosWrapper.get(url);
      if (response.data?.success) {
        const payload = response.data?.data;
        setMaterials(Array.isArray(payload) ? payload : []);
        if (!Array.isArray(payload)) {
          console.warn('Materials API returned non-array payload', payload);
        }
      } else {
        toast.error(response.data?.message || "Failed to fetch materials");
        setMaterials([]);
      }
    } catch (error) {
      console.error("Error fetching materials:", error);
      toast.error("Failed to fetch materials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [selectedSemester, selectedType]);

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const getTypeIcon = (type) => {
    const icons = {
      notes: <FiBook className="w-5 h-5" />,
      assignment: <FiFileText className="w-5 h-5" />,
      syllabus: <FiArchive className="w-5 h-5" />,
      video: <FiVideo className="w-5 h-5" />,
    };
    return icons[type] || <FiFileText className="w-5 h-5" />;
  };

  const getTypeColor = (type) => {
    const colors = {
      notes: "bg-blue-100 text-blue-800",
      assignment: "bg-green-100 text-green-800",
      syllabus: "bg-purple-100 text-purple-800",
      video: "bg-red-100 text-red-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDownload = (material) => {
    const link = document.createElement('a');
    const file = material.file || material.link;
    link.href = `${process.env.REACT_APP_MEDIA_LINK}/${file}`;
    link.download = material.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (material) => {
    const file = material.file || material.link;
    window.open(`${process.env.REACT_APP_MEDIA_LINK}/${file}`, '_blank');
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <style>{`
        .info-banner { 
          background:linear-gradient(145deg,#fff7ee,#ffe9d1); 
          border-left:4px solid #f28300; 
          padding:16px; 
          margin-top:16px; 
          margin-bottom:24px; 
          border-radius:12px; 
          box-shadow:0 4px 12px rgba(242,131,0,0.15); 
        }
        .material-card { 
          position:relative; 
          background:linear-gradient(160deg,#ffffff,#fffaf3); 
          border-radius:16px; 
          overflow:hidden; 
          box-shadow:0 6px 20px rgba(0,0,0,0.1); 
          transition:all .35s; 
          border:1px solid #f3e2cc; 
        }
        .material-card:before { 
          content:''; 
          position:absolute; 
          top:-40px; 
          right:-40px; 
          width:120px; 
          height:120px; 
          background:linear-gradient(135deg,rgba(242,131,0,0.25),rgba(255,157,77,0.3)); 
          filter:blur(35px); 
          opacity:.4; 
        }
        .material-card:hover { 
          transform:translateY(-6px); 
          box-shadow:0 12px 32px rgba(242,131,0,0.25); 
        }
        .material-card-content { 
          padding:24px; 
          position:relative; 
        }
        .type-badge { 
          padding:6px 12px; 
          border-radius:20px; 
          font-size:11px; 
          font-weight:700; 
          text-transform:capitalize; 
          letter-spacing:.3px; 
        }
        .type-badge.notes { 
          background:linear-gradient(135deg,#fff7ee,#ffe9d1); 
          color:#d97200; 
        }
        .type-badge.assignment { 
          background:linear-gradient(135deg,#f0fdf4,#dcfce7); 
          color:#16a34a; 
        }
        .type-badge.syllabus { 
          background:linear-gradient(135deg,#faf5ff,#f3e8ff); 
          color:#9333ea; 
        }
        .type-badge.video { 
          background:linear-gradient(135deg,#fef2f2,#fee2e2); 
          color:#dc2626; 
        }
        .material-title { 
          font-size:17px; 
          font-weight:700; 
          color:#2f2f2f; 
          margin:16px 0 8px; 
          display:-webkit-box; 
          -webkit-line-clamp:2; 
          -webkit-box-orient:vertical; 
          overflow:hidden; 
        }
        .material-desc { 
          font-size:14px; 
          color:#6b5c4a; 
          margin-bottom:12px; 
          display:-webkit-box; 
          -webkit-line-clamp:2; 
          -webkit-box-orient:vertical; 
          overflow:hidden; 
        }
        .material-info { 
          font-size:13px; 
          margin-bottom:16px; 
        }
        .material-info-row { 
          display:flex; 
          justify-content:space-between; 
          margin-bottom:6px; 
        }
        .material-info-label { 
          color:#8a5a15; 
          font-weight:600; 
        }
        .material-info-value { 
          color:#2f2f2f; 
          font-weight:600; 
        }
        .material-actions { 
          display:flex; 
          gap:8px; 
        }
        .action-btn { 
          flex:1; 
          padding:10px 16px; 
          border-radius:10px; 
          font-weight:600; 
          transition:all .3s; 
          display:flex; 
          align-items:center; 
          justify-content:center; 
          gap:8px; 
          font-size:13px; 
          cursor:pointer; 
          border:none; 
          text-decoration:none; 
        }
        .action-btn.view { 
          background:linear-gradient(135deg,#f28300,#ff9d4d); 
          color:#fff; 
        }
        .action-btn.view:hover { 
          background:linear-gradient(135deg,#d97200,#f28300); 
          transform:translateY(-2px); 
        }
        .action-btn.download { 
          background:linear-gradient(135deg,#3b82f6,#60a5fa); 
          color:#fff; 
        }
        .action-btn.download:hover { 
          background:linear-gradient(135deg,#2563eb,#3b82f6); 
          transform:translateY(-2px); 
        }
        .overview-card { 
          background:linear-gradient(145deg,#fff7ee,#ffe9d1); 
          border-radius:16px; 
          padding:24px; 
          margin-top:32px; 
          border:1px solid #ffe0c2; 
        }
        .overview-title { 
          font-size:18px; 
          font-weight:700; 
          color:#d97200; 
          margin-bottom:16px; 
        }
        .overview-grid { 
          display:grid; 
          grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); 
          gap:16px; 
        }
        .overview-stat { 
          text-align:center; 
        }
        .overview-number { 
          font-size:32px; 
          font-weight:700; 
          color:#f28300; 
        }
        .overview-label { 
          font-size:13px; 
          color:#8a5a15; 
          font-weight:600; 
        }
      `}</style>
      <div className="mb-8">
        <Heading title="Coordinator - Study Materials" />
        <div className="info-banner">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-current" style={{color:'#f28300'}} viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p style={{fontSize:'14px',color:'#8a5a15',fontWeight:500}}>
                As a coordinator, you can view and manage study materials for your branch. You can download, view, and organize materials by semester and type.
              </p>
            </div>
          </div>
        </div>
      </div>

      {Array.isArray(materials) && materials.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material) => (
              <div key={material._id} className="material-card">
                <div className="material-card-content">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div style={{color:'#f28300'}}>{getTypeIcon(material.type)}</div>
                      <span className={`type-badge ${material.type}`}>{material.type}</span>
                    </div>
                    <span style={{fontSize:'11px',color:'#8a5a15',fontWeight:600}}>Sem {material.semester}</span>
                  </div>
                  <h3 className="material-title">{material.title}</h3>
                  <p className="material-desc">{material.description || 'No description available'}</p>
                  <div className="material-info">
                    <div className="material-info-row">
                      <span className="material-info-label">Subject:</span>
                      <span className="material-info-value">{material.subject?.name || material.subjectId?.name || 'N/A'}</span>
                    </div>
                    <div className="material-info-row">
                      <span className="material-info-label">Uploaded:</span>
                      <span className="material-info-value">{formatDate(material.createdAt)}</span>
                    </div>
                    <div className="material-info-row">
                      <span className="material-info-label">Uploaded by:</span>
                      <span className="material-info-value">{material.uploadedBy || 'Faculty'}</span>
                    </div>
                  </div>
                  <div className="material-actions">
                    <button
                      onClick={() => handleView(material)}
                      className="action-btn view"
                    >
                      <FiEye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(material)}
                      className="action-btn download"
                    >
                      <FiDownload className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="overview-card">
            <h3 className="overview-title">Materials Overview</h3>
            <div className="overview-grid">
              <div className="overview-stat">
                <div className="overview-number">{materials.length}</div>
                <div className="overview-label">Total Materials</div>
              </div>
              <div className="overview-stat">
                <div className="overview-number" style={{color:'#3b82f6'}}>{materials.filter(m => m.type === 'notes').length}</div>
                <div className="overview-label">Notes</div>
              </div>
              <div className="overview-stat">
                <div className="overview-number" style={{color:'#9333ea'}}>{materials.filter(m => m.type === 'assignment').length}</div>
                <div className="overview-label">Assignments</div>
              </div>
              <div className="overview-stat">
                <div className="overview-number" style={{color:'#dc2626'}}>{materials.filter(m => m.type === 'syllabus').length}</div>
                <div className="overview-label">Syllabus</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <NoData message={`No materials found for semester ${selectedSemester}${selectedType !== 'all' ? ` and type ${selectedType}` : ''}`} />
      )}
    </div>
  );
}

export default Material;
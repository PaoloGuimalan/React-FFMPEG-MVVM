import { useDispatch } from 'react-redux';
import { UserAuth } from '../../core/models/auth/UserModel';
import { AuthVModelInstance } from '../../core/vmodels/auth/AuthVModel';
import { useEffect, useMemo, useRef } from 'react';
import MediaProcessingVModel from '../../core/vmodels/mediaprocessing/MediaProcessingVModel';

function Home() {

  const input = useRef<HTMLInputElement | null>(null);

  const { clearUser, getUser } = AuthVModelInstance;

  const user: UserAuth = getUser();
  const dispatch = useDispatch();

  const MediaProcess: Transcoder = useMemo(() => new MediaProcessingVModel(), []);

  useEffect(() => {
    MediaProcess.checkLogs();
  }, []);

  const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const filesFromInput: any = e.target.files;

    const arrayOfFiles = Array.from(filesFromInput);

    arrayOfFiles
      .slice(0, 1)
      ?.map((slicedfile: any) => MediaProcess.processMedia(slicedfile));
  };

  const handleLogout = () => {
    clearUser(dispatch);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#ffffff',
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            margin: 0,
            color: '#333',
            fontSize: '1.5rem'
          }}>My Website</h1>
          <nav>
            <ul style={{
              display: 'flex',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              gap: '1.5rem',
              alignItems: 'center'
            }}>
              <li>
                <a href="/" style={{
                  color: '#333',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>Home</a>
              </li>
              <li>
                <a href="/about" style={{
                  color: '#333',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>About</a>
              </li>
              <li>
                <a href="/contact" style={{
                  color: '#333',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>Contact</a>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              marginTop: 0,
              color: '#333',
              fontSize: '1.2rem',
              marginBottom: '1rem'
            }}>Dashboard</h2>
            <p style={{
              color: '#666',
              lineHeight: '1.5'
            }}>Welcome to your dashboard! Here you can manage your account and view your data.</p>
            <p style={{
              color: '#666',
              lineHeight: '1.5'
            }}>You are {user.user?.firstName} with lastname of {user.user?.lastName} and email of {user.user?.email}</p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              marginTop: 0,
              color: '#333',
              fontSize: '1.2rem',
              marginBottom: '1rem'
            }}>Recent Activity</h2>
            <p style={{
              color: '#666',
              lineHeight: '1.5'
            }}>Your recent activities will appear here.</p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              marginTop: 0,
              color: '#333',
              fontSize: '1.2rem',
              marginBottom: '1rem'
            }}>Quick Actions</h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <input type="file" 
                ref={input}
                hidden placeholder="Enter email upload file" 
                onChange={changeEvent}
                multiple={false}
              />
              <button style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onClick={() => {
                input.current?.click();
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}>
                Upload Media
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0 }}>© 2024 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
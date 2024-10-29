import styled from 'styled-components';

export const Container = styled.div`
  
  padding: 2rem;
  margin: 0 auto;
  max-width: 1400px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h2`
  font-size: 2rem;
  color: #333;
`;

export const UserInfo = styled.div`
  font-size: 1rem;
  color: #666;
`;

export const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

export const MovieCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: white;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const MovieImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

export const MovieContent = styled.div`
  padding: 1rem;
`;

export const MovieTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0 0 1rem 0;
  color: #333;
`;

export const ReviewSection = styled.div`
  margin: 1rem 0;
`;

export const Review = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

export const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ReviewInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: #f0f0f0;
          color: #333;
          &:hover { background-color: #e0e0e0; }
        `;
      case 'danger':
        return `
          background-color: #ff4444;
          color: white;
          &:hover { background-color: #ff0000; }
        `;
      default:
        return `
          background-color: #007bff;
          color: white;
          &:hover { background-color: #0056b3; }
        `;
    }
  }}
`;

export const LikeButton = styled.button<{ isLiked: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background: #f9f9f9;
  border-radius: 8px;
`;

export const EmptyText = styled.p`
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;